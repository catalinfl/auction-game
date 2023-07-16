import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type NotificationTypes = {
    message: string | null,
    title: string | null,
    kind: string | null,
    type: string | null,
    _id: string | null
}

const initialState: NotificationTypes = {
    message: null,
    title: null,
    kind: null,
    type: null,
    _id: null
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<NotificationTypes>) => {
            state.message = action.payload.message;
            state.title = action.payload.title;
            state.kind = action.payload.kind;
            state.type = action.payload.type;
            state._id  = action.payload._id;
        },
        deleteNotification: (state) => {
            state.message = null;
            state.title = null;
            state.kind = null;
            state.type = null;
            state._id = null;
        }
    }
})

export const { setNotification, deleteNotification } = notificationSlice.actions;

export default notificationSlice.reducer;