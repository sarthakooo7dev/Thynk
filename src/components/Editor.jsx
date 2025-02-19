import React, { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LuPanelLeftOpen } from "react-icons/lu";
import Groq from "groq-sdk";
import { FaCopy } from "react-icons/fa";
import Default from '../assets/Default';
import DefaultPrompt from '../assets/DefaultPrompt';


const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

export const Editor = ({ isOpen, setIsOpen, listItems, optionVal, setListItems, quillContent, setQuillContent, setIsModalOpen, setFlowLoader, setFlowData }) => {

  const [isCopy, setIsCopied] = useState(false)
  const [groqInput, setGroqInput] = useState('');
  const [prompt, setPrompt] = useState(DefaultPrompt)

  const labelConfigRef = useRef(true);


  const showSelectedContent = () => {
    const obj = listItems.filter((val) => val.id === optionVal);
    setQuillContent(obj[0].content)
  }

  const HandleCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(Default);
  }


  const HandleGroqAsyncReq = async () => {
    setFlowLoader(true)
    if (groqInput.length > 50) {
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: 'user',
              content: prompt + ' - ' + groqInput,
            },
          ],
          model: 'llama-3.3-70b-versatile',
        });

        const responseContent = chatCompletion.choices[0]?.message?.content || 'No response';

        const flowObject = JSON.parse(responseContent);
        setFlowData(flowObject)
        setIsModalOpen(true)
        setFlowLoader(false)

      }
      catch (error) {
        alert('Something went wrong !')
        console.error('Error fetching chat completion:', error);
      }
    }
    else {
      setFlowLoader(false)
      alert("Add more content to generate AI Insights !")
    }

  }

  // Custom Toolbar Configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Headings (H1, H2, H3)
      ["bold", "italic", "underline", "strike"], // Text Styles
      ["blockquote", "code-block"], // Blockquote & Code Block
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ script: "sub" }, { script: "super" }], // Subscript & Superscript
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      [{ align: [] }], // Alignments (Left, Center, Right, Justify)
      [{ color: [] }, { background: [] }], // Text & Background Colors

    ],
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
  };


  useEffect(() => {
    showSelectedContent();
    labelConfigRef.current = true;
  }, [optionVal])


  const HandleContentLabel = (currentInput) => {
    setTimeout(() => {
      if (currentInput.length > 25) {
        const label = currentInput.substring(0, 15) + "...";
        const newList = listItems.map((val) =>
          val.id === optionVal ? { ...val, title: label } : val
        );
        setListItems(newList)
        labelConfigRef.current = false;
      }
    }, 2000)

  }



  // Prevent infinite re-renders using useCallback
  const handleEditorChange = useCallback((content, delta, source, editor) => {

    const currentHTML = editor.getHTML();
    const currentText = editor.getText();
    setGroqInput(currentText)
    setQuillContent(currentHTML);

    if (labelConfigRef.current) {
      HandleContentLabel(currentText);
    }

  }, [optionVal]);


  return (
    <div className={`edtr_cntnr   ${isOpen ? 'edtr_open' : 'edtr_closed'}`}>

      <div className='edtr_layout '>

        <span className={` ${!isOpen ? 'btn_vsbl' : 'btn_none'}`} style={{
          padding: '1rem', color: "rgb(184, 189, 189)", fontSize: '1.7rem', paddingRight: '2rem', cursor: 'pointer'
        }} onClick={() => setIsOpen(!isOpen)} ><LuPanelLeftOpen /></span>

        <div className='quill_cntnr  '>
          <ReactQuill className="dark-theme" modules={modules} value={quillContent || ""} onChange={handleEditorChange} />
        </div>

      </div>

      <div className='edtr_btns '>

        <button className='btn_edtrPage' onClick={HandleCopy}>   <FaCopy style={{ fontSize: '12px' }} /> {isCopy ? 'copied' : 'copy'}</button>
        <button className='btn_edtrPage' onClick={HandleGroqAsyncReq}>Generate</button>
      </div>





    </div>
  )
}
