import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './components/Login/login'; 
import Create from './components/CreateAccount/create'; 
import Home from './components/Home/Home';
import Feedback from './components/Feedback/Feedback';
import QuestionGenerator from './components/Questiongenerator/QuestionGenerator';
import QuestionsPage from './components/Questiongenerator/QuestionPage';
import SpeechToText from './components/SpeechToText/SpeechToText';
import Summarizer from './components/Summarizer/Summarizer';
import NoteMaker from './components/NoteMaker/NoteMaker';
import AudioRecorder from './components/AudioNotes/AudioRecorder';
import Note from './components/Note/Note';
import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/Todo/TodoList";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} /> 
          <Route path="/create-account" element={<Create />} />
          <Route path="/" element={<Login />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/question" element={<QuestionGenerator/>} />
          <Route path="/questionPage" element={<QuestionsPage/>} />
          <Route path='/summarizer' element={<Summarizer/>}></Route>
          <Route path='/note-maker' element={<NoteMaker/>}></Route>
          <Route path='/speech-to-text' element={<SpeechToText/>}></Route>
          <Route path="/audio-notes" element={<AudioRecorder />} />
          <Route path='/note'element={<Note/>}></Route>
          <Route path="/todo" element={<TodoProvider><TodoList /></TodoProvider>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
