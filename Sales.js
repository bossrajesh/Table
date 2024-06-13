import React, { useState } from 'react';
import './Sales.css';


  // Mock data
  const data =  [
      {
        "id": "electronics",
        "label": "Electronics",
        "value": 1400, //this value needs to be calculated from the children values (800+700)
        "children": [
          {
            "id": "phones",
            "label": "Phones",
            "value": 800
          },
          {
            "id": "laptops",
            "label": "Laptops",
            "value": 700
          }
        ]
      },
      {
        "id": "furniture",
        "label": "Furniture",
        "value": 1000, //this need to be calculated from the children values (300+700)
        "children": [
          {
            "id": "tables",
            "label": "Tables",
            "value": 300
          },
          {
            "id": "chairs",
            "label": "Chairs",
            "value": 700
          }
        ]
      }
    ]

function Sales() {
  const [mockData, setMockData] = useState(data)
  const [inputValue, setInputValue] = useState();
  const [allocationPercentage, setAllocationPercentage] = useState(null);
  const [allocationValue, setAllocationValue] = useState(null);
  const [variance, setVariance] = useState(null);

  const onInput = (currentField, id) => {
    const fieldName = currentField.name;
    const fieldValue = currentField.value;
    setInputValue({...inputValue, [fieldName]: fieldValue});
  };

  const inputClick = (item, value) => {
    for(let k in inputValue) {
    const percentage = parseFloat(inputValue[k]);
    if (!isNaN(percentage)) {
      if(item === k) {
      const newAllocationValue = value + (value * percentage) / 100;
        const dd = mockData.map((parent) => {
         parent.children.map((child) => {
          if(child.label === k) {
            child.value = newAllocationValue
          }
          return child
        })
        return parent;
      })
      setMockData(dd)
      }
    } else {
      alert('Please enter a valid number for allocation percentage.');

    }
    }
  };
  
  const inputVal = (item, value) => {
    for(let k in inputValue) {
      const percentage = parseFloat(inputValue[k]);
      if (!isNaN(percentage)) {
        if(item === k) {
        const newAllocationValue = value + (value * percentage) / 100;
          const newData = mockData.map((parent) => {
            parent.oldValue = parent.value;
            let total = 0;
              let data = parent.children.map(child => {
                total +=child.value;
                return total
              })
              parent.value = data[1];
              let newVariance = parseInt(data[1] - parent.oldValue);
              const variance = (newVariance/parent.oldValue) * 100;
              parent['variance'] = variance.toFixed(2); 
              return parent
          })
          setMockData(newData)
        }
      } else {
        alert('Please enter a valid number for percentage increase.');
  
      }
      }
  };  

  


  // Function to calculate total value recursively
  const calculateTotalValue = (node) => {
    let total = 0;
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        total += calculateTotalValue(child);
      });
    } else {
      total = node.value;
    }
    return total;
  };
    console.log('DDD', mockData)

  return (
    <div className="SalesPr">
      <table>
        <tbody>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance</th>
          </tr>
          {mockData?.map((parent, index, id) => (
            <>
            <tr key={index}>
              <td>{parent.label}</td>
              <td>{parent.value !== null ? parent.value : calculateTotalValue(parent)}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{parent?.variance}</td>
            </tr>

            {parent.children.map((child) => (
              <tr key={child.id} >
              <td>{child.label}</td>
              <td>{child.value}</td>
              <td><input type='text' name={child.label} onChange={(e) => onInput(e.target, child.id)} /></td>
              <td><button className='' onClick={(e) => inputClick(child.label, child.value)}>Sales %</button></td>
              <td><button className='' onClick={(e) => inputVal(child.label, child.value)}>Sales Val</button></td>

              </tr>
            ))}
           
           </>
            
            
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
