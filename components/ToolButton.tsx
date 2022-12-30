import React, { useState } from 'react'
import Image from 'next/image'
import { Box } from '@chakra-ui/react'

type ButtonProps = JSX.IntrinsicElements['a']
const ToolButton = React.forwardRef<
  HTMLAnchorElement,
  ButtonProps & { id: string; name: string; version: string }
>(function ToolButton({ onClick, href, target, id, name, version }, ref) {
  const display = version ? 'flex' : 'none'
  const [imageSrc, setImageSrc] = useState(`/images/tool/${id}.png`)

  return (
    <a
      href={href}
      onClick={onClick}
      ref={ref}
      target={target}
      style={{ textDecoration: 'none' }}
      rel="noreferrer"
    >
      <Box
        key="{id}"
        style={{
          borderRadius: '5px',
          minHeight: '120px',
          paddingTop: '20px',
          paddingBottom: '20px',
          backgroundColor: '#f7fafc',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box style={{ marginBottom: 5 }}>
          <Image
            src={imageSrc}
            width={45}
            height={45}
            alt="logo"
            onError={() => setImageSrc(`/images/noimage.png`)}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box
          style={{ wordBreak: 'break-word', padding: '0 20px' }}
          color="lightText"
        >
          {name}
        </Box>
        {
          <Box
            bg="gray.200"
            mt={2}
            p={1}
            width="80%"
            display={display}
            justifyContent="center"
            rounded="base"
          >
            {version}
          </Box>
        }
      </Box>
    </a>
  )
})

export default ToolButton
