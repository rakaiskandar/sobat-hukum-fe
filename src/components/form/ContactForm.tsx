import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const ContactForm = () => {
  return (
    <form className="mt-6 max-w-lg mx-auto space-y-4">
        <Input type="text" placeholder="Masukkan nama" />
        <Input type="email" placeholder="Masukkan email" />
        <Textarea rows={5} placeholder="Masukkan pesan" />
        <Button type="submit" className="w-full">
          Kirim
        </Button>
    </form>
  )
}

export default ContactForm