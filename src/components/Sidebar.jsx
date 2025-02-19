import React, { useState } from 'react'
import { RiChatNewLine } from "react-icons/ri";
import { LuPanelLeftClose } from "react-icons/lu";
import { FaFileAlt } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";

const Sidebar = ({ isOpen, setIsOpen, listItems, HandleAddItem, optionVal, setOptionVal, HandleNewContent, HandleDelItem }) => {

  const handleSelect = (valId) => {
    setOptionVal(valId);
    HandleNewContent(optionVal)
  }

  return (

    <div className={`sdbr_cntnr  ${isOpen ? 'sdbr_open' : 'sdbr_closed'}`}>
      <div className='sdbr_icons'>
        <span onClick={() => setIsOpen(!isOpen)} >  <LuPanelLeftClose /></span>
        <span onClick={() => HandleAddItem()} >  <RiChatNewLine /></span>

      </div>

      {isOpen && (
        <div className=''>
          {
            listItems && listItems.map((val) => {
              return (
                <div className={`lst_item ${val.id == optionVal ? "lst_select" : ""}`} key={val.id} onClick={() => handleSelect(val.id)}>
                  <FaFileAlt /> {val.title} <VscChromeClose style={{

                    fontSize: "18px",
                    cursor: "pointer",
                    fontSize: '20px'
                  }} onClick={(e) => {
                    e.stopPropagation(); // Stops handleSelect from triggering
                    HandleDelItem(val.id);
                  }} />
                </div>

              )
            })
          }
        </div>
      )}
    </div>
  )
}

export default Sidebar