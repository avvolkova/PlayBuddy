import { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMessageActionCreator } from "../../redux/action-creators/createEventThunk";
import styles from './ModalChat.module.css'
import './ModalChat.css'

const wsClient = new WebSocket('ws://localhost:1234')


function ModalCHat() {
  const { userChats, modalChat, user } = useSelector(store => store)
  const dispatch = useDispatch()
  const chat = userChats.find(chat => chat._id === modalChat)
  const [input, setInput] = useState('');
  const inputHandler = ({ target }) => {
    setInput(target.value)
  }

  wsClient.onopen = () => {
    console.log('open');
  }

  const wsPost = () => {
    wsClient.send(JSON.stringify({ mess: input, chatId: chat._id, userId: user.id }))
    setInput('');
  }

  wsClient.onmessage = (message) => {
    const { newMess, chatId } = JSON.parse(message.data);
    dispatch(addMessageActionCreator({ newMess, chatId }))
  }

  return (
    ReactDOM.createPortal(
      <>
        <div className={styles.chatModule}>
          {chat
            ?
            (chat.messages.length
              ?
              <>
                <div className={styles.chatInModule}>
                  {chat.messages.map(mess => {
                    let avatarPath;
                    if (mess.user_ref.avatar === '/uploads/avatar.png') {
                      avatarPath = `${mess.user_ref.avatar}`;
                    } else {
                      avatarPath = `/uploads/${mess.user_ref.avatar}`;
                    }
                    return (
                      user.id === mess.user_ref._id
                        ?
                        <>
                          <div className={styles.userRR}>
                            <div className={styles.userRight} key={mess._id}>
                              {mess.text}
                            </div>
                          </div>
                        </>
                        :
                        <>
                          <div key={mess._id} className={styles.nonUserDiv}>
                            <div>
                              <span>
                                <img alt="ava" src={avatarPath} className={styles.chatAvatar} />
                              </span>
                              &ensp;
                              <span className={styles.author}>
                                {mess.user_ref.name}:
                              </span>
                            </div>
                            {mess.text}
                          </div>
                        </>
                    )
                  })}
                </div>
                <div className={styles.chatInput}>
                  <div className="input-group mb-3">
                    <input type="text" className="inp form-control" placeholder="Введите сообщение" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={inputHandler} value={input} />
                    <div className="input-group-append">
                      <button onClick={wsPost} className="btn btn-outline-info btn-lg bbbtn" type="button">Отправить</button>
                    </div>
                  </div>
                </div>
              </>
              :
              (
                <>
                  <br />
                  <br />
                  <div className={styles.chatInput}>
                    <div className="input-group mb-3">
                      <input onChange={inputHandler} value={input} type="text" className="form-control inp" placeholder="Введите сообщение" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                      <div className="input-group-append">
                        <button onClick={wsPost} className="btn btn-outline-info btn-lg bbbtn" type="button">Отправить</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    {'there are no messages here yet'}
                  </div>
                </>
              ))
            :
            (
              <div>
                {'select Сhat'}
              </div>
            )
          }
        </div>
      </>
      , document.getElementById('portal')
    )
  )
}
export default ModalCHat;
