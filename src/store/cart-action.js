import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async ()=>{
            const response = await fetch(`https://react-http-6c20f-default-rtdb.firebaseio.com/cart.json`);

             if(!response.ok){
                throw new Error('fetching cart data failed!');
             }
            const data = await response.json();

            return data;
        }

        try{
          const cartData =  await fetchData();
          dispatch(cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity
          }));
        }catch(error){
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Sending cart data failed!",
                })
              );
        }
    }
}


export const sendCartData = (cartData) => {
    return async (dispatch) => {
      console.log(dispatch);
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data",
        })
      );
  
      const sendRequest = async () => {
        const response = await fetch(
          `https://react-http-6c20f-default-rtdb.firebaseio.com/cart.json`,
          {
            method: "PUT",
            body: JSON.stringify({
                items: cartData.items,
                totalQuantity: cartData.totalQuantity
            }),
          }
        );
    
        if (!response.ok) {
          throw new Error(`Sending cart data failed!`);
        }
      };
  try{
    await sendRequest();
  }catch(error){
    dispatch(
      uiActions.showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart data failed!",
      })
    );
  }
  
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    }
  };
  