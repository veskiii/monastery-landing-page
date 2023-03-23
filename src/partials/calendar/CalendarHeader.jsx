
const MONTH_NAMES = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

const CalendarHeader = (props) => {
    const {month, year, onNextMonth, onPrevMonth} = props;

    const isPrevMonthButtonDisabled = () => {
        const today = new Date();
        if( today.getMonth() === month && today.getFullYear() === year) {
            return true;
        }
        return false;
    }

    const prevMonthButtonDisabled = isPrevMonthButtonDisabled();

    return (
    <div className="flex items-center justify-between py-2 px-6">
        <div>
            <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
            <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
        </div>
        <div className="border rounded-lg px-1">
            <button 
                type="button"
                className={(prevMonthButtonDisabled && "cursor-not-allowed opacity-25 ") + "leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center"}
                disabled={prevMonthButtonDisabled}
                onClick={onPrevMonth}
                >
                <svg className="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>  
            </button>
            <div className="border-r inline-flex h-6"></div>		
            <button 
                type="button"
                className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1" 
                onClick={onNextMonth}
                >
                <svg className="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>									  
            </button>
        </div>
    </div>
    );
}

export default CalendarHeader;