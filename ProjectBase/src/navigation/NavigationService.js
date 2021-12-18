/**
 * Created by Hong HP on 10/1/18.
 */
import * as React from "react";
import { StackActions } from "@react-navigation/native";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function navigationPop() {
  navigationRef.current?.dispatch(StackActions.pop(1));
}

export function toggleDrawer() {
  navigationRef.current?.toggleDrawer();
}

export function replace(name: string, params?: any) {
  navigationRef?.current?.dispatch(StackActions.replace(name, params));
}
