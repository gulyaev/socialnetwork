import React from "react";
import DialogItem from "../../components/DialogItem";
import Message from "../../components/Message";

const Dialogs = (props) => {
  return <div>Эта компонента требует рефакторинга</div>;
  /* требует рефакторинга 
  return (
    <div className="dialogs">
      <div className="dialogs__users users">
        {props.messageData.map((dialog) => {
          return (
            <div className="users__item">
              <DialogItem name={dialog.name} id={dialog.id} />
            </div>
          );
        })}
      </div>
      <div className="dialogs__messages messages">
        {props.dialomessageDatagsData.map((dialog) => {
          return <Message message={dialog.message} />;
        })}
      </div>
    </div>
  );
  */
};

export default Dialogs;
