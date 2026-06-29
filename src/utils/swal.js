import Swal from 'sweetalert2';

export const dtAlert = (opts) => Swal.fire({ customClass: { popup: 'dt-swal' }, ...opts });

export const dtConfirm = (opts) =>
  dtAlert({ showCancelButton: true, confirmButtonText: 'Ya', cancelButtonText: 'Batal', ...opts });

export const dtToast = (title, icon = 'success') =>
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2600,
    timerProgressBar: true,
    icon,
    title,
    customClass: { popup: 'dt-swal' },
    didOpen: (t) => {
      t.addEventListener('mouseenter', Swal.stopTimer);
      t.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

export default Swal;
