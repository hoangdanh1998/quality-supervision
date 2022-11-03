import React, { useState } from 'react'
import { DataTable as Table } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import _ from 'lodash'
import './style.scss'

let n = 0
const columns = [
    { field: 'key', header: 'Key' },
    { field: 'value', header: 'Value' },
    { field: 'comment', header: 'Comment' },
];

const newEmptyParam = { key: "", value: "", comment: "" }

const DataTable = () => {


    const [products2, setProducts2] = useState([newEmptyParam]);
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (newValue.trim().length <= 0 && field === 'key') return
        rowData[field] = newValue;
        if (products2[products2.length - 1].key)
            setProducts2([...products2, { key: "", value: "", comment: "" }])

    }

    const cellEditor = (option) => {
        debugger
        return (
            <InputText
                type="text"
                //value={option?.value}
                value={option.rowData[option?.value]}
                onChange={(e) => option.editorCallback(e.target.value)}
            />
        )
        // if (option.field === 'action')
        //     return;
        // else {
        //     return textEditor(option);

        // }
    }

    // const textEditor = (options) => {
    //     console.log('options: ', options)

    //     return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    // }
    // let times = 0;
    const onClickRemoveButton = rowData => {
        let newList = [...products2]
        _.remove(newList, item => item.key === rowData.key)
        setProducts2(newList)
        console.log(newList);

        if (products2.length <= 0)
            setProducts2([{ key: "", value: "", comment: "" }])
    }

    const actionBodyTemplate = rowData => {
        if (_.some(Object.values(rowData), item => !!item))
            return (
                <Button type="button"
                    className="p-button-rounded p-button-text"
                    icon="pi pi-trash"
                    onClick={() => onClickRemoveButton(rowData)} />
            )
    }

    return (
        <div className="card p-fluid">
            <h5>Header</h5>
            <Table
                value={products2}
                editMode="cell"
                responsiveLayout="scroll"
                scrollable scrollHeight="12rem"
                className="editable-cells-table"
            >
                {columns.map(({ field, header }) => (
                    <Column key={field} field={field} header={header} style={{ width: '25%' }}
                        editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />
                ))}
                <Column style={{ width: '25%' }}    // key="action"
                    body={(rowValues, rowData) => actionBodyTemplate(rowValues, rowData)}
                    bodyStyle={{ display: 'flex', justifyContent: 'flex-end' }} />
            </Table>
        </div>
    )
}
export default DataTable;