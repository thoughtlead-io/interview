import { EventEmitter } from 'events'
import { WebSocket } from 'ws'

interface SocketMessage {
	event: 'media' | 'mark' | 'clear';
	media?: {
		payload: string
	}
	mark?: {
		name: string
	}
}

interface CallMediaQueueArgs {
	streamSid: string;
	socket: WebSocket
}

class CallMediaQueue extends EventEmitter {

	private queue: SocketMessage[]
	private isSending: boolean
	private streamSid: string
	private socket: WebSocket

	constructor(args: CallMediaQueueArgs) {
		super()
		this.queue = []
		this.isSending = false
		this.streamSid = args.streamSid
		this.socket = args.socket

		this.socket.on('message', async (message) => {
			const data = JSON.parse(message.toString())

			switch (data.event) {
				case 'mark': {
					this.emit('mark', data.mark.name)
					break
				}
			}
		})
	}

	private processNext(): void {
		if (!this.isSending && this.queue.length > 0) {
			this.isSending = true
			this.sendNext()
		}
	}

	private sendNext(): void {
		if (this.queue.length === 0) {
			this.isSending = false
			return
		}

		const socketMessage = this.queue.shift()

		this.sendToTwilio(socketMessage)

		this.isSending = false
		this.processNext()
	}

	// Sends audio to Twilio as it arrives– faster than real-time
	private sendToTwilio(socketMessage: SocketMessage) {
		this.socket.send(
			JSON.stringify({
				event: socketMessage.event,
				streamSid: this.streamSid,
				media: socketMessage.media,
				mark: socketMessage.mark,
			})
		)
	}

	private clearQueue(): void {
		this.queue = []
	}

	private enqueue(mediaData: SocketMessage): void {
		this.queue.push(mediaData)
		this.processNext()
	}

	// New audio payload available
	media(payload: string): void {
		this.enqueue({
			event: 'media',
			media: {
				payload,
			},
		})
	}

	// Mark a point in the audio stream since Twilio handles the audio buffer and we can't control the timing
	// Once we send audio in real-time, we can remove this method or use it locally.\
	mark(name: string): void {
		this.enqueue({
			event: 'mark',
			mark: {
				name,
			},
		})
	}

	// Clear the audio queue with Twilio. When we send in real-time, we can remove this method or use it locally.
	clear(): void {
		this.sendToTwilio({ event: 'clear' })
		this.clearQueue()
	}

	// Set the volume of the audio stream, 0-1
	setVolume(volume: number): void {
		// Part B
	}

}

export default CallMediaQueue
