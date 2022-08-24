import MemoryCalendar from "../features/memories/memory-calendar/memory-calendar"
import withLoggedIn from "../HOC/withLoggedIn"

const CreateMemoryPage = () => {
    return(
        <div>
            <h4>Create a Memory</h4>
            {/* <MemoryCalendar/> */}
        </div>
    )
}

export default withLoggedIn(CreateMemoryPage);