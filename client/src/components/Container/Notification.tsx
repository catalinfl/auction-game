import { Banner, HIERARCHY, KIND } from "baseui/banner";
import { Delete } from "baseui/icon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteNotification } from "../../redux/slices/notificationSlice";


function ActionIcon({size} : { size: string }) {
    return (
      <Delete size={size} />
    );
}

const Notification = () => {
    
    const notifications = useSelector((state: RootState) => state.notificationSlice);
    const { message, title, kind, type} = notifications;

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const onClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        const temp = setTimeout(() => {
          setIsOpen(false);
          dispatch(deleteNotification());
        }, 5000);
    
        if (type !== null) {
          setIsOpen(true);
          temp;
        }
    
        return () => clearTimeout(temp);
    }, [notifications]);
    
    return (
        isOpen && kind !== null ?
        <div className="notificationContainer">
            <Banner
            action={{
                label: 'Label',
                onClick: () => onClose(),
                icon: ActionIcon
            }}
            title={title}
            hierarchy={HIERARCHY.high}
            kind={KIND[kind as keyof typeof KIND]}
            >
            { message }
            </Banner>
        </div>
        : null 
      );
}

export default Notification