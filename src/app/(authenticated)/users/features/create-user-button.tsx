'use client';

import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { UpsertUserDialog } from './upsert-user-dialog';

export const CreateUserButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && createPortal(
                <UpsertUserDialog open={open} onClose={() => setOpen(false)} user={null} />,
                document.body
            )}
            <Button onClick={() => setOpen(true)}>
                <UserPlus className="h-4 w-4" />
                Novo usuário
            </Button>
        </>
    );
};
