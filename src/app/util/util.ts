import { MatSnackBar } from "@angular/material/snack-bar";


export class Util {

  openSnackBar(
    _snackBar: MatSnackBar,
    message: string,
    action: string,
    clase: string
  ) {
    _snackBar.open(message, action, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [clase],
    });
  }
}
