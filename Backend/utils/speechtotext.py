import speech_recognition as sr
from pydub import AudioSegment
from pydub.silence import split_on_silence

def convert_audio_to_wav(input_audio):
    """Convert audio file to WAV format if necessary."""
    audio = AudioSegment.from_file(input_audio)
    output_wav = "converted_audio.wav"
    audio.export(output_wav, format="wav")
    return output_wav

def transcribe_google(audio_file):
    """Transcribe audio using Google Speech Recognition (requires internet)."""
    recognizer = sr.Recognizer()
    
    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)
    
    try:
        text = recognizer.recognize_google(audio_data)
        return text
    except sr.UnknownValueError:
        return "Google Speech Recognition could not understand the audio."
    except sr.RequestError:
        return "Could not connect to Google Speech Recognition service."


# def main():
#     wav_file = r"D:\coding\PROJECTS\coding\LearnBuddy\Backend\utils\sample2.wav"  # Replace with your actual audio file
    
#     # Convert to WAV if needed
#     # wav_file = convert_audio_to_wav(input_audio)

#     print("\nTranscribing using Google Speech Recognition (requires internet)...")
#     google_text = transcribe_google(wav_file)
#     print("\nGoogle Transcription:\n", google_text)

# if __name__ == "__main__":
#     main()
