import React, { useEffect, useState } from 'react'
import ListData from '../assets/ListData';
import Loader from '../assets/loader.gif'
import { Editor } from '../components/Editor';
import Sidebar from '../components/Sidebar';
import Flow from '../components/Flow';
import { IoCloseCircleSharp } from "react-icons/io5";
import Loader_mdl from '../assets/loader_mdl.gif'

const Playground = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [listItems, setListItems] = useState(ListData);
  const [optionVal, setOptionVal] = useState('0000');
  const [quillContent, setQuillContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [flowLoader, setFlowLoader] = useState(false);
  const [flowData, setFlowData] = useState({})

  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  }, [])


  // # func. to create a new Item for SideBar List
  const HandleAddItem = () => {

    const newItem = { id: new Date().getTime().toString(), title: 'New Chat...', content: 'Lets Journal !' };
    console.log('handle AxDD===')
    setListItems([newItem, ...listItems]);
  }

  // # func. to del a Item from SideBar List
  const HandleDelItem = (delId) => {
    const newListAfterdel = listItems.filter((val) => val.id !== delId);
    console.log('del - ' + JSON.stringify(newListAfterdel));
    setListItems(newListAfterdel)
  }


  const HandleNewContent = (oldId) => {
    const newArr = listItems.map((val) =>
      val.id === oldId ? { ...val, content: quillContent } : val);
    setListItems(newArr)

  }

  return (<>

    {
      isLoading ? <div className='loading_screen'>   <img src={Loader} ></img> </div> : <div className='pg_cntnr  '>
        <div  >
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} listItems={listItems} HandleAddItem={HandleAddItem} optionVal={optionVal} setOptionVal={setOptionVal} HandleNewContent={HandleNewContent} HandleDelItem={HandleDelItem} />
        </div>
        <div >
          <Editor isOpen={isOpen} setIsOpen={setIsOpen} listItems={listItems} optionVal={optionVal} setListItems={setListItems} quillContent={quillContent} setQuillContent={setQuillContent} setIsModalOpen={setIsModalOpen} setFlowLoader={setFlowLoader} setFlowData={setFlowData} />
        </div>



        <div className={` ${isModalOpen ? '' : 'btn_none'}`} >
          <div className="modal-overlay" >
            <div className="modal-content  " >

              <IoCloseCircleSharp className='closeFlow_btn' onClick={() => setIsModalOpen(!isModalOpen)} />

              <Flow flowData={flowData} />

            </div>
          </div>
        </div>

        {/* Loader while flow data is being fetched */}
        {
          flowLoader ? <div className="ld_overlay">
            <div className="ld_cnt " >
              <img src={Loader_mdl} ></img>
            </div>
          </div> : ''
        }



      </div>
    }


  </>
  )
}

export default Playground