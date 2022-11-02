import React, {useState} from 'react'
import { DataTable as Table } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import './style.scss'

const columns = [
    { field: 'key', header: 'Key' },
    { field: 'value', header: 'Value' },
    { field: 'comment', header: 'Comment' },
    { field: 'actions'}
];
const DataTable = () => {
    const [products2, setProducts2] = useState([{key: "aa", value: "", comment: "", actions: ""}]);
    const [selectedCustomer,setSelectedCustomer] = useState(null)
    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'quantity':
            case 'price':
             break;

            default:
                if (newValue.trim().length > 0)
                    rowData[field] = newValue;
                else
                    event.preventDefault();
                break;
        }
    }

    const cellEditor = (options) => {
        if (options.field === 'actions')
            return;
        else
            return textEditor(options);
      }
      
      const textEditor = (options) => {
  
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
      }

  return (
    <div className="card p-fluid">
        <h5>Row Editing</h5>
        <Table value={products2} editMode="cell" className="editable-cells-table" responsiveLayout="scroll">
        {
            columns.map(({ field, header }) => {
                            return <Column key={field} field={field} header={header} style={{ width: '25%' }} body={field === 'price'}
                                editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />
            })
        }
        </Table>
    </div>
  )
}
export default DataTable;