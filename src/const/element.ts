import { ButtonProps } from "@/types/button";

export enum Element {
    a="a",
    button="button",
    div="div",
    input="input",
    span="span",
    img="img",
    p="p",
    h1="h1",
    h2="h2",
    h3="h3",
    h4="h4",
    h5="h5",
    h6="h6",
    ul="ul",
    ol="ol",
    li="li",
    table="table",
    tr="tr",
    td="td",
    th="th",
    select="select",
    option="option",
    textarea="textarea",
    form="form",
    label="label",
    legend="legend",
    fieldset="fieldset",
    submit="submit",
    reset="reset",
}
export const defaultBtn: ButtonProps = {
    backgroundColor: 'black',
    color: 'white',
    height: '50px',
    width: '100px',
    borderRadius: '0px',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px',
    border: 'none',
    cursor: 'move',
  }