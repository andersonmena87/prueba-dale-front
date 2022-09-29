import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginatorIntl } from '@angular/material/paginator';

const rangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} de ${length}`;
}

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

  TranslatePaginator() {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = "Items por página";
    paginatorIntl.firstPageLabel = "Primera página";
    paginatorIntl.nextPageLabel = "Próxima página";
    paginatorIntl.previousPageLabel = "Página anterior";
    paginatorIntl.lastPageLabel = "Última página";
    paginatorIntl.getRangeLabel = rangeLabel;
    return paginatorIntl;
  }
}