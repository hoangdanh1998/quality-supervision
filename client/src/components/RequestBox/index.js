import React, {useState} from 'react'
import { BreadCrumb } from 'primereact/breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import {DataTable} from '../../components'
import styles from './RequestBox.module.scss'
import clsx from 'clsx';

const items = [
  { label: 'Blog Application' },
  { label: 'List Blog' },
];
const cities = [
  'GET',
  'POST',
  'DELETE',
  'PACTH',
  'PUT'
];
const home = { icon: 'pi pi-th-large'}
const contentTypes = [
  {name: 'application/json'},
  {name: 'application/text'},
  {name: 'application/html'},
];
const frameworks = [{name: "Jest"},{name: "Junit"}]


function RequestBox() {
  const [city, setCity] = useState("GET");
  const [activeIndex, setActiveIndex] = useState(0);
  const [bodyType, setBodyType] = useState(null);
  const [code, setCode] = useState("")
  const [statusCode, setStatusCode] = useState("")
  const [contentType, setContentType] = useState({name: "application/json"})

  const [framework, setFramework] = useState("Jest")
  const tabs = [
    {label: 'Params'},
    {label: 'Auth'},
    {label: 'Header'},
    {label: 'Body'},
    {label: 'Expected Output'},
    {label: 'Jest', 
    template: (item, options) => {
      return (
          /* custom element */
          <Dropdown style={{border: 'none'}} optionLabel="name" value={framework} options={frameworks} onChange={(e) => setFramework(e.value)}/>
      );
  }},
  ];

  let tabContent;
  switch (activeIndex) {
    case 0: break;
    case 2: 
    tabContent = <DataTable/>;
    break;
    case 1: break;
    case 3: 
      tabContent = 
    <div className='mt-3 '>
      <div className='flex md:justify-content-start justify-content-center flex-wrap card-container cyan-container'>
        <div className="field-radiobutton mr-5">
              <RadioButton value="val1" name="city1" onChange={(e) => setBodyType(e.value)} checked={bodyType === 'val1'} />
              <label htmlFor="city1">raw</label>
        </div>
        <div className="field-radiobutton  mr-5">  
              <RadioButton value="val2" name="city2" onChange={(e) => setBodyType(e.value)} checked={bodyType === 'val2'} />
              <label htmlFor="city2">form-data</label>
        </div>
        <div className="field-radiobutton  mr-5">  
              <RadioButton value="val3" name="city3" onChange={(e) => setBodyType(e.value)} checked={bodyType === 'val3'} />
              <label htmlFor="city3">x-www-form-unlencoded</label>
        </div>
      </div>
      <div>
              <InputTextarea rows={5} 
              value={code} 
              style={{width: '100%'}}
              onChange={(e) => setCode(e.target.value)} />
      </div>
    </div>
    break;
    case 4: 
    tabContent =  
    <>
    <div className='mt-3 mb-3 flex justify-content-between'>
      <div className='flex align-items-center'>
        <div className='mr-2'>Status Code</div>
        <InputNumber 
        className={clsx(styles.p_inputnumber, {
          [styles.accept]: statusCode >= 200 && statusCode < 300,
          [styles.request_error]: statusCode >= 400 && statusCode < 500,
          [styles.server_error]: statusCode >= 500 && statusCode < 600
        })}
         value={statusCode} 
         onChange={(e) => setStatusCode(e.value)} />
      </div>
      <div className='flex align-items-center'>
        <div className='mr-2'>Content-Type</div>
        <Dropdown 
          className={styles.p_dropdown} 
          optionLabel="name" 
          value={contentType}
          options={contentTypes} 
          onChange={(e) => setContentType(e.value)}
         />
      </div>
    </div>
    <div>
        <InputTextarea rows={5} 
        value={code} 
        style={{width: '100%'}}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Response "/>
    </div>
    </>
    break;
    default:
      break;
  }

  return (
    <div className='px-1'>
      <h3>
          <BreadCrumb model={items} home={home} style={{background: 'inherit', border: 'none'}}/>
      </h3>
      <div className='w-full flex mt-2'>
          <Dropdown className='w-25' value={city} options={cities} onChange={(e) => setCity(e)}
          style={{minWidth: "7.5rem",}}/>
          <div className="p-inputgroup mr-2 ml-2">
              <InputText placeholder="Enter request URL" />
          </div>
          <Button label="GO" />
      </div>
      <TabMenu className='mt-2' model={tabs} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>
      { tabContent}
  </div>
  )
}

export default RequestBox