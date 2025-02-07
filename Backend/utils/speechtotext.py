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

def transcribe_sphinx(audio_file):
    """Transcribe audio using CMU Sphinx (offline)."""
    recognizer = sr.Recognizer()
    
    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)
    
    try:
        text = recognizer.recognize_sphinx(audio_data)
        return text
    except sr.UnknownValueError:
        return "CMU Sphinx could not understand the audio."
    except sr.RequestError:
        return "CMU Sphinx request error."

def transcribe_large_audio_sphinx(audio_file):
    """Handles large audio files by splitting on silence and transcribing each part using CMU Sphinx."""
    recognizer = sr.Recognizer()
    sound = AudioSegment.from_wav(audio_file)
    
    # Split audio where silence is 700ms or more
    chunks = split_on_silence(sound, min_silence_len=700, silence_thresh=sound.dBFS-14, keep_silence=500)
    
    full_text = ""
    
    for i, chunk in enumerate(chunks, start=1):
        chunk_filename = f"chunk_{i}.wav"
        chunk.export(chunk_filename, format="wav")
        
        with sr.AudioFile(chunk_filename) as source:
            audio_data = recognizer.record(source)
            
            try:
                text = recognizer.recognize_sphinx(audio_data)
                full_text += f"{text} "
            except sr.UnknownValueError:
                full_text += "[Unrecognized Audio] "
            except sr.RequestError as e:
                full_text += f"[Request Error: {e}] "
    
    return full_text

def main():
    wav_file = r"D:\coding\PROJECTS\coding\LearnBuddy\Backend\utils\sample2.wav"  # Replace with your actual audio file
    
    # Convert to WAV if needed
    # wav_file = convert_audio_to_wav(input_audio)

    print("\nTranscribing using Google Speech Recognition (requires internet)...")
    google_text = transcribe_google(wav_file)
    print("\nGoogle Transcription:\n", google_text)

    print("\nTranscribing using CMU Sphinx (offline)...")
    sphinx_text = transcribe_sphinx(wav_file)
    print("\nCMU Sphinx Transcription:\n", sphinx_text)

    print("\nTranscribing large audio using CMU Sphinx (offline)...")
    sphinx_large_text = transcribe_large_audio_sphinx(wav_file)
    print("\nCMU Sphinx Large Audio Transcription:\n", sphinx_large_text)

if __name__ == "__main__":
    main()
