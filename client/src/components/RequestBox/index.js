import React, {useState} from 'react'
import { BreadCrumb } from 'primereact/breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';

const items = [
  { label: 'Blog Application' },
  { label: 'List Blog' },
];
const cities = [
  {name: 'GET'},
  {name: 'POST'},
  {name: 'DELETE'},
  {name: 'PACTH'},
  {name: 'PUT'}
];
const home = { icon: 'pi pi-th-large'}
const tabs = [
  {label: 'Params', icon: 'pi pi-fw pi-home'},
  {label: 'Auth', icon: 'pi pi-fw pi-calendar'},
  {label: 'Header', icon: 'pi pi-fw pi-pencil'},
  {label: 'Body', icon: 'pi pi-fw pi-file'},
  {label: 'Expected Output', icon: 'pi pi-fw pi-cog'},
  {label: 'Jest', icon: 'pi pi-fw pi-cog'},
];
function RequestBox() {
  const [city, setCity] = useState("GET");
  const [activeIndex, setActiveIndex] = useState(0);
  const [bodyType, setBodyType] = useState(null);
  const [code, setCode] = useState("")
  return (
    <div className='px-1'>
      <h3>
          <BreadCrumb model={items} home={home} style={{background: 'inherit', border: 'none'}}/>
      </h3>
      <div className='w-full flex mt-2'>
          <Dropdown className='w-25' optionLabel="name" value={city} options={cities} onChange={(e) => setCity(e.value)}
          style={{minWidth: "7.5rem",}}/>
          <div className="p-inputgroup mr-2 ml-2">
              <InputText placeholder="Enter request URL" />
          </div>
          <Button label="GO" />
      </div>
      <TabMenu className='mt-2' model={tabs} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>
      
      {/*This is tab content */}
      <div className='mt-3 flex md:justify-content-start justify-content-center flex-wrap card-container cyan-container'>
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
  )
}

export default RequestBox