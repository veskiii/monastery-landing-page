const CalendarEvent = (props) => {
    const {event, onShowPopup} = props;

    const clickHandler = () => {
        onShowPopup(event);
    }
    return (
        <div
            className="px-2 py-1 rounded-lg mt-1 overflow-hidden border cursor-pointer"
            onClick={(e) => {e.preventDefault(); e.stopPropagation(); clickHandler();}}
        >
            <p className="text-sm truncate leading-tight">{event.title}</p>
        </div>
    )
}

export default CalendarEvent;