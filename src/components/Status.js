import React, {useEffect, useState} from 'react';

const Status = () => {
    const status = ["Не подтверждена", "Ваш заказ упакован", "Ваш заказ в пути", "Ваш заказ отправлен"];
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(second => (second === 4 ? 4 : second + 1));
        }, 10000);

        return () => clearInterval(interval)
    }, []);

    return (
        <div>
            <strong>{status[seconds]}</strong>
        </div>
    );
}

export default Status;