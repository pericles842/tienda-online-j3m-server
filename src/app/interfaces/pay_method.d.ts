export type PayMethodsTypes = 'pagomovil' | 'tranferencia' | 'billetera_digital' | 'divisa';

export interface PayMethodMobilePay {
  name_bank: string;
  code_bank: string;
  phone: string;
  documentation: number;
}
export interface PayMethodTransfer extends PayMethodMobilePay {
  num_account: string;
  type_account: 'ahorro' | 'corriente';
  type_person: 'natural' | 'juridica';
}

export interface PayMethodDigitalWallet {
  email: string;
}
