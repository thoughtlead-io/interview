# Thoughtly Telecom Engineering Interview

Feel free to use any language or framework you are comfortable with. We are not looking for a perfect solution, but we are looking for a solution that is well thought out. Feel free to use any resources you need to complete the challenge.

## Instructions

1. Fork this repository and clone it to your local machine.
2. Navigate to the project directory.
3. Implement the following tasks– it should take you no more than an hour.
4. You may use whatever resources you want to complete the challenge, but you should be able to explain your solution.
5. You may use any programming language or framework you are comfortable with.

## Part A: Real-time Audio Packet Transmission

As you know, Thoughtly allows users to build AI agents that talk on the phone with their customers. This was a fun, real-world problem we had to solve when building our platform– so hopefully you'll enjoy it too!

**Objective:** Refactor the `CallMediaQueue` class (`queue.ts`) to ensure audio packets are sent in real-time, rather than faster than real-time. The current solution relies on Twilio to maintain a buffer of audio packets and play them back at the correct speed. This involves managing the rate at which audio packets are sent to Twilio, ensuring they are dispatched at a pace that mirrors the real-world timing of the audio being played.

**Requirements:**

1. Analyze the current implementation of the `CallMediaQueue` class to understand its handling of media packet enqueueing and sending.
2. Implement a timing mechanism that controls the dispatch of audio packets based on the actual duration of the audio they represent. Consider the sample rate and bit depth of the audio being sent.
3. Ensure that the solution dynamically adapts to varying sizes of audio packets and maintains smooth audio playback.
4. Address any potential issues related to buffering, network latency, and packet loss to ensure a consistent audio stream.

## Part B: Audio Volume

**Objective:** Implement the `setVolume` method in `CallMediaQueue` to allow the volume of the audio being played to be adjusted in real-time.

**Requirements:**

1. Ensure that the volume adjustment is applied to the audio packets in real-time, without any noticeable delay or distortion in the audio playback.
2. Consider the impact of volume adjustment on the audio quality and ensure that the audio remains clear and intelligible at all volume levels.
