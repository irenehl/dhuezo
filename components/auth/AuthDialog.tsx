'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MagicLinkForm } from './MagicLinkForm'
import { OTPForm } from './OTPForm'
import { GoogleButton } from './GoogleButton'
import { Separator } from '@/components/ui/separator'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>
            Elige tu método preferido para autenticarte
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Google Sign In */}
          <GoogleButton />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O continúa con
              </span>
            </div>
          </div>

          {/* Tabs para Magic Link y OTP */}
          <Tabs defaultValue="magic-link" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
              <TabsTrigger value="otp">Código OTP</TabsTrigger>
            </TabsList>

            <TabsContent value="magic-link">
              <MagicLinkForm onSuccess={() => onOpenChange(false)} />
            </TabsContent>

            <TabsContent value="otp">
              <OTPForm onSuccess={() => onOpenChange(false)} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
