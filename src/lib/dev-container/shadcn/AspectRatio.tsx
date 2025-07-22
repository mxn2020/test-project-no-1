// src/lib/dev-container/shadcn/AspectRatio.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';
import { AspectRatio as ShadcnAspectRatio } from '../../../components/ui/aspect-ratio';

type ShadcnAspectRatioProps = React.ComponentPropsWithoutRef<typeof ShadcnAspectRatio>;
type DevAspectRatioProps = ShadcnAspectRatioProps & DevProps & { children?: React.ReactNode };

export const AspectRatio = React.forwardRef<
  React.ElementRef<typeof ShadcnAspectRatio>,
  DevAspectRatioProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnAspectRatio ref={ref} {...props}>
        {children}
      </ShadcnAspectRatio>
    );
  }

  return (
    <Container
      componentId={devId}
      definitionId="dev-aspect-ratio"
      selectable={devSelectable}
    >
      <ShadcnAspectRatio ref={ref} {...props}>
        {children}
      </ShadcnAspectRatio>
    </Container>
  );
});

AspectRatio.displayName = 'DevAspectRatio';

