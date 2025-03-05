/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, description, ...props }) => {
        return (
          <Toast key={id} {...props}>
            {description && (
              <ToastDescription>{description}</ToastDescription>
            )}
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}