import { ForwardedRef, forwardRef } from 'react';
import { CloseButtonProps, ToastContainer, ToastContainerProps } from 'react-toastify';
import SkdfIcon from '../SkdfIcon';

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <SkdfIcon name="cross" className="align-self-baseline" onClick={closeToast} />
);

// const options = {
//   position: 'top-right',
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// };
// const t = (
//   <ToastContainer
//     position="top-right"
//     autoClose={5000}
//     hideProgressBar={false}
//     newestOnTop={false}
//     closeOnClick
//     rtl={false}
//     pauseOnFocusLoss
//     draggable
//     pauseOnHover
//   />
// );
function ToastifyContainer(props: ToastContainerProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <ToastContainer
      ref={ref}
      theme="colored"
      closeButton={CloseButton}
      position="bottom-right"
      // autoClose={false}
      icon={false}
      {...props}
    />
  );
}

export default forwardRef(ToastifyContainer);
