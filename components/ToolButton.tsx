import React, { useState } from 'react'
import Image from 'next/image'
import { Box } from '@chakra-ui/react'
import { getBlurDataURL } from '../lib/image'

type ButtonProps = JSX.IntrinsicElements['a']
const ToolButton = React.forwardRef<
  HTMLAnchorElement,
  ButtonProps & { id: string; name: string; version: string }
>(function ToolButton({ onClick, href, id, name, version }, ref) {
  const [imageSrc, setImageSrc] = useState(`/images/tool/${id}.png`)

  return (
    <a
      href={href}
      onClick={onClick}
      ref={ref}
      style={{ textDecoration: 'none' }}
    >
      <Box
        key="{id}"
        style={{
          borderRadius: '8px',
          minHeight: '120px',
          padding: '20px 10px',
          backgroundColor: '#f7fafc',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          height={45}
          width={45}
          style={{
            position: 'relative',
            marginBottom: '12px',
          }}
        >
          <Image
            src={imageSrc}
            alt="logo"
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
            fill
            onError={() => setImageSrc(`/images/noimage.png`)}
            style={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box
          style={{
            wordBreak: 'break-word',
            padding: '5px 20px 0',
            textAlign: 'center',
            fontSize: '14px',
            lineHeight: '1.4',
          }}
          color="lightText"
        >
          {name}
        </Box>
        {version && (
          <Box
            bg="gray.200"
            mt={2}
            p={1}
            width="80%"
            display="flex"
            justifyContent="center"
            rounded="base"
            fontSize="12px"
          >
            {version}
          </Box>
        )}
      </Box>
    </a>
  )
})

export default ToolButton
