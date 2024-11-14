type BusType = {
  name: string
  studentId: string
  phoneNumber: string
  reserved: boolean
}

export type BusFormType = Omit<BusType, 'reserved'>

export type BusReserveReqeust = {
  body: Omit<BusType, 'reserved'>
}

export type BusReserveInfoReqeust = {
  urls: Pick<BusType, 'studentId'>
}

export type BusReserveInfoResponse = Pick<BusType, 'reserved'>
