import { useEffect, useState } from "react";
import { useInvites, useStorageItems } from "shelflife-react-hooks";

export default function NotificationsIcon() {
    const { fetchAboutToExpireAggregated, fetchRunningLowAggregated, runningLow, aboutToExpireItems } = useStorageItems();
    const { fetchInvites, invites } = useInvites();

    const [notificationCount, setNotificationCount] = useState<number>(0);

    const countData = async () => {
        setNotificationCount(aboutToExpireItems.length + runningLow.length + invites.filter(x => !x.accepted).length)
    }

    useEffect(() => {
        countData();
    }, [invites, runningLow, aboutToExpireItems])

    useEffect(() => {
        fetchAboutToExpireAggregated();
        fetchRunningLowAggregated();
        fetchInvites();
    }, [])

    if (notificationCount === 0)
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
            </svg>
        )

    return (
        <div className="indicator">
            <span className="indicator-item badge badge-xs badge-primary">{notificationCount}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
            </svg>
        </div>
    );
}