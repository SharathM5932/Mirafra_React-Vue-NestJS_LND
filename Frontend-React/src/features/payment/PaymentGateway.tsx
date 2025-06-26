// import React, { useState } from 'react';
// import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { useNavigate } from 'react-router-dom';
// import { sendTransaction } from './paymentSlice';
// import { useAppDispatch } from './hooks';
// import DialogBox from '../../components/DialogBox';
// import { clearCart } from '../cart/cartSlice';

// interface PaymentProps {
//   amount: number;
// }

// const PaymentGateway: React.FC<PaymentProps> = ({ amount }) => {
//   const initialOptions = {
//     clientId: "test",
//     currency: "USD",
//     intent: "capture",
//   };

//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [dialogVisible, setDialogVisible] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState("");

//   const showDialog = (message: string, callback?: () => void) => {
//     setDialogMessage(message);
//     setDialogVisible(true);
//     if (callback) {
//       setTimeout(() => {
//         setDialogVisible(false);
//         callback();
//       }, 2000);
//     }
//   };

//   return (
//     <>
//       <PayPalScriptProvider options={initialOptions}>
//         <PayPalButtons
//           style={{ layout: "vertical" }}
//           createOrder={(data, actions) => {
//             return actions.order.create({
//               purchase_units: [
//                 {
//                   amount: {
//                     currency_code: "USD",
//                     value: (amount / 80).toFixed(2),
//                   },
//                 },
//               ],
//               intent: 'CAPTURE'
//             });
//           }}
//           onApprove={(data, actions) => {
//             if (actions.order) {
//               return actions.order.capture().then((details) => {
//                 const emailid = JSON.parse(localStorage.getItem("auth") || "{}")?.emailid;
//                 const transaction = {
//                   id: details.id,
//                   payer: details,
//                   create_time: details.create_time,
//                   status: details.status,
//                 };

                
//                 dispatch(sendTransaction({ emailid: emailid || '', transaction }))
//                   .unwrap()
//                   .then(() => {
//                     dispatch(clearCart()); // <-- Clear cart in Redux state
//                     showDialog(`Transaction completed by ${details.payer?.name?.given_name}`, () => {
//                       navigate('/ordercreate', { state: { transaction } });
//                     });
//                   })

//               });
//             }
//             return Promise.resolve();
//           }}
//         />
//       </PayPalScriptProvider>

//       <DialogBox
//         visible={dialogVisible}
//         message={dialogMessage}
//         onClose={() => setDialogVisible(false)}
//       />
//     </>
//   );
// };

// export default PaymentGateway;


import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import { sendTransaction } from './paymentSlice';
import { useAppDispatch } from './hooks';
import DialogBox from '../../components/DialogBox';
import { clearCart } from '../cart/cartSlice';

interface PaymentProps {
  amount: number;
}

const PaymentGateway: React.FC<PaymentProps> = ({ amount }) => {
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [loading, setLoading] = useState(false); // Spinner state

  const showDialog = (message: string, callback?: () => void) => {
    setLoading(false); // Hide spinner before showing dialog
    setDialogMessage(message);
    setDialogVisible(true);
    if (callback) {
      setTimeout(() => {
        setDialogVisible(false);
        callback();
      }, 2000);
    }
  };

  return (
    <>
      {/* Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-blue-600 font-medium">Processing Transaction...</span>
        </div>
      )}

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: (amount / 80).toFixed(2),
                  },
                },
              ],
              intent: 'CAPTURE'
            });
          }}
          onApprove={(data, actions) => {
            setLoading(true); // Start spinner

            if (actions.order) {
              return actions.order.capture().then((details) => {
                const emailid = JSON.parse(localStorage.getItem("auth") || "{}")?.emailid;
                const transaction = {
                  id: details.id,
                  payer: details,
                  create_time: details.create_time,
                  status: details.status,
                };
                dispatch(sendTransaction({ emailid: emailid || '', transaction }))
                  .unwrap()
                  .then(() => {
                    dispatch(clearCart());
                    showDialog(`Transaction completed by ${details.payer?.name?.given_name}`, () => {
                      navigate('/ordercreate', { state: { transaction } });
                    });
                  })
                  .catch(() => {
                    setLoading(false);
                    alert("Transaction failed.");
                  });
              });
            }
            return Promise.resolve();
          }}
        />
      </PayPalScriptProvider>

      <DialogBox
        visible={dialogVisible}
        message={dialogMessage}
        onClose={() => setDialogVisible(false)}
      />
    </>
  );
};

export default PaymentGateway;
