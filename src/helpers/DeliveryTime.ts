export const Delivery = {
    getTime: (time: string, saturday: string) => {

        let deliveryOnSaturday = false;

        if(saturday === "S") {
            deliveryOnSaturday = true;
        }

        let deadline = parseInt(time);

        for(let i = 0; i <= deadline; i++) {
            const addDays = new Date().setDate(new Date().getDate() + i);
            const rightDay = new Date(addDays);
            if(rightDay.getDay() === 6 && deliveryOnSaturday === false) {
                deadline++;
            }
            if(rightDay.getDay() === 0) {
                deadline++;
            }
        }

        const addDays = new Date().setDate(new Date().getDate() + deadline);
        const rightDay = new Date(addDays);

        let month = '';

        switch(rightDay.getMonth()) {
            case 0:
                month = 'Janeiro';
            break;
            case 1:
                month = 'Fevereiro';
            break;
            case 2:
                month = 'Março';
            break;
            case 3: 
                month = 'Abril';
            break;
            case 4:
                month = 'Maio';
            break;
            case 5:
                month = 'Junho';
            break;
            case 6:
                month = 'Julho';
            break;
            case 7:
                month = 'Agosto';
            break;
            case 8: 
                month = 'Setembro';
            break;
            case 9: 
                month = 'Outubro';
            break;
            case 10:
                month = 'Novembro';
            break;
            case 11: 
                month = 'Dezembro';
            break;
        }

        let day = '';

        switch(rightDay.getDay()) {
            case 0:
                day = 'domingo';
            break;
            case 1:
                day = 'segunda';
            break;
            case 2: 
                day = 'terça';
            break;
            case 3:
                day = 'quarta';
            break;
            case 4:
                day = 'quinta';
            break;
            case 5:
                day = 'sexta';
            break;
            case 6:
                day = 'sábado';
            break;
        }

        return `${day} ${rightDay.getDate()} de ${month}`;
    }
}