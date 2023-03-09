import $ from 'jquery';

/**
 * Generate Toast Id
 */
function genrateRamdomId() {
    const max = 9999999;
    const min = 1000000;
    const id = Math.floor(Math.random() * (max - min)) + min;
    return id;
}

/**
 * Close Toast
 * @param {*} toastId
 */
function handleCloseToastById(toastId: number) {
    $(document).on('click', (e: any) => {
        $(e.target).parent(`#${toastId}`).remove();
    });
    setTimeout(() => {
        $(`#${toastId}`).remove();
    }, 4000);
}

export class Toastr {
    /**
     * Success Message
     * @param {*} message
     */
    public static success(message: string) {
        const ramdomId = genrateRamdomId();
        handleCloseToastById(ramdomId);
        $('.toast-wrap').append(`
            <div id="${ramdomId}" class="cc-toast toast-success">
                <span class="toast-messages">${message}</span>
                <span class="toast-close">&times;</span>
            </div>
        `);
    }

    /**
     * Warning Message
     * @param {*} message
     */
    public static warning(message: string) {
        const ramdomId = genrateRamdomId();
        handleCloseToastById(ramdomId);
        $('.toast-wrap').append(`
            <div id="${ramdomId}" class="cc-toast toast-warning">
                <span class="toast-messages">${message}</span>
                <span class="toast-close">&times;</span>
            </div>
        `);
    }

    /**
     * Error Message
     * @param {*} message
     */
    public static error(message: string) {
        const ramdomId = genrateRamdomId();
        handleCloseToastById(ramdomId);
        $('.toast-wrap').append(`
            <div id="${ramdomId}" class="cc-toast toast-danger">
                <span class="toast-messages">${message}</span>
                <span class="toast-close">&times;</span>
            </div>
        `);
    }
}
