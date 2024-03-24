import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
export function AlertModal({status,message}){
    const borderColor = status ? 'green' : 'red';
    return(
      <>
      <Dialog
        open={true}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{ color: borderColor }}
      >
        <DialogHeader  >{status?"Request was successful !":"Request failed!"}</DialogHeader>
        <DialogBody>
         {message?message:!status?'Something went wrong!':null}
        </DialogBody>
      </Dialog>
    </>
)
}