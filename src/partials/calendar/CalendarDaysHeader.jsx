
const DAYS = ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pią', 'Sob'];

const CalendarDaysHeader = () => {

    return (
        <div className="-mx-1 -mb-1">
            <div className="flex flex-wrap mb-[40px]">
                {DAYS.map((day, i) => 
                    <div className="px-2 py-2 w-[14.26%]" key={i}>
                        <div
                        className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                            {day}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CalendarDaysHeader;