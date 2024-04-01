import React, { useEffect, useState } from 'react'
import todo from './images.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addListItem, removeListItem, removeAll, editListItem } from './store/slices/listSlice';

const App = () => {
  const [inputVal, updInputVal] = useState('');
  const [toggle, updToggle] = useState(true);
  const [newId, updNewId] = useState(null);

  const dispatch = useDispatch();
  let list = useSelector(state => state.listSlice.list);

  const changeVal = (e) => {
    updInputVal(e.target.value);
  }
  const addDataList = () => {
    if (!inputVal) {
      toast('plz fill the data!', { position: 'top-center' })
    }
    else if (!toggle && inputVal) {
      dispatch(editListItem({id:newId, name:inputVal}));
      updToggle(true);
      updInputVal('');
    } 
    else {
      let items = { id: new Date().getTime().toString(), name: inputVal }
      dispatch(addListItem(items));
      updInputVal('')
    }
  }
  const deleteSingle = (id) => {
    dispatch(removeListItem(id));
  }
  const editItem = (id, name) => {
    updToggle(false);
    updInputVal(name);
    updNewId(id);
  }
  const allItemDelete = () => {
    dispatch(removeAll())
  }

  useEffect(() => {
    return localStorage.setItem('reduxList', JSON.stringify(list));
  }, [list])

  return (
    <div>
      <div className='main'>
        <ToastContainer />
        <img src={todo} alt="no image" />
        <p>Add Your List Here ✌</p>
        <div className="search">
          ✍<input type="text" name="" placeholder='Add items...' value={inputVal} onChange={changeVal} />
          {toggle ? <i className="fa fa-plus" aria-hidden="true" onClick={addDataList}></i>
            : <i className="fa-solid fa-pen-to-square" id='edit_itemd' aria-hidden="true" onClick={addDataList}></i>}
        </div>
        <ol>
          {list.map((curr) => {
            let nameLength = curr.name.slice(0, 30);
            return (
              <li className='search' id='list' key={curr.id}> <div id='mobile_list'>{nameLength.length >= 30 ? `${nameLength}...` : `${nameLength}`}</div>
                <div><i className="fa-solid fa-pen-to-square" title='edit item' onClick={() => editItem(curr.id, curr.name)}></i>
                  <i className="fa-regular fa-trash-can" title='delete item' onClick={() => deleteSingle(curr.id)}></i>
                </div></li>
            )
          })}
        </ol>
        <button onClick={allItemDelete}>check list</button>
      </div>
    </div>
  )
}

export default App
