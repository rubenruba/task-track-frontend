import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from "@mui/material";
import moment from 'moment';
import { FC, useEffect, useState } from "react";
import { CalendarDayComponent } from "../../components/calendarDay/calendarDay";
import { DatePickerCustom } from "../../components/datePicker/datePicker";
import { MenuComponent } from "../../components/menu/menu";
import { TaskModel } from '../../models/task';
import { UserMinimal } from '../../models/user';
import { TaskService } from '../../services/TaskService';
import './calendar.sass';

export const Calendar: FC<{ user: UserMinimal}> = ({ user }) => {
    const taskService = new TaskService();
    const [momentDate, setMonthDate] = useState(moment());
    const [days, setDays] = useState<Array<number>>([]);
    const [monthTasks, setMonthTasks] = useState<TaskModel[]>([]);

    useEffect(() => {
        const firstDay = moment(momentDate).startOf('month');
        const lastDay = moment(momentDate).endOf('month');
        const newDays = [];
        let day = firstDay.get('date');
        
        for(let i = 1; i <= 35; i++) {
            if(firstDay.get('d') > i) newDays.push(0);
            else if(lastDay.get('date') < day) newDays.push(0);
            else newDays.push(day++);
        }
        
        const getTasks = async () => {
            const tasks = user?.id ? await taskService.getTaskByUserIdAndDate(user.id, momentDate.format('YYYY-MM')) : null;
            setMonthTasks(tasks ?? []);
        }
        getTasks();

        setDays(newDays);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [momentDate]);

    const nextMonth = () => {
        setMonthDate(moment(momentDate).add(1, 'month'));
    }

    const previousMonth = () => {
        setMonthDate(moment(momentDate).subtract(1, 'month'));
    }

    return (
        <section className="calendar-section">
            <MenuComponent />
            <div className="calendar-container">
                <div className="calendar-month">
                    <IconButton onClick={previousMonth} size="small" style={{ color: '#014B7A' }}>
                        <ChevronLeftIcon/>
                    </IconButton>

                    <DatePickerCustom date={moment(momentDate).format('YYYY-MM-DD')} onchange={(value: string) => setMonthDate(moment(value))} />

                    <IconButton onClick={nextMonth} size="small" style={{ color: '#014B7A' }}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <div className="calendar-days">
                    {days.length > 0 && days.map((day) => {
                        const dayDate = moment(`${day}-${momentDate.month() + 1}-${momentDate.year()}`, "DD-MM-YYYY").format('YYYY-MM-DD');
                        return (
                            <CalendarDayComponent 
                               date={dayDate} 
                               user={user} 
                               tasks={monthTasks.filter(t => t.date === dayDate)}
                               setTasks={setMonthTasks}
                            />
                        ); 
                    })}
                </div>
            </div>
        </section>
    );
} 