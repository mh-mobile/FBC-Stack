import React, { useRef, useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Chapter, ShowNote } from '../types/podcastData'

// Chakra UIにPlayIcon/PauseIconがない場合のカスタム実装
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 2.69v10.62c0 .64.78.96 1.23.51l8.15-5.31a.7.7 0 0 0 0-1.02L5.23 2.18A.7.7 0 0 0 4 2.69z" />
  </svg>
)

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.5 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1zm5 0a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1z" />
  </svg>
)

type Props = {
  audioUrl: string
  title: string
  showNotes: ShowNote[]
  chapters: Chapter[]
}

const PodcastPlayer: React.FC<Props> = ({
  audioUrl,
  title,
  showNotes,
  chapters,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedTab, setSelectedTab] = useState<'showNotes' | 'chapters'>('showNotes')

  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
    }
  }, [])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const seekTo = (time: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = time
    setCurrentTime(time)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleChapterClick = (startTime: number) => {
    seekTo(startTime)
    if (!isPlaying) {
      audioRef.current?.play()
      setIsPlaying(true)
    }
  }

  return (
    <VStack spacing={6} align="stretch" w="100%">
      <audio ref={audioRef} src={audioUrl} />
      
      {/* Player Controls */}
      <Box
        p={4}
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <VStack spacing={4}>
          <Heading size="md" noOfLines={1}>
            {title}
          </Heading>
          
          <HStack spacing={4} w="100%">
            <IconButton
              aria-label={isPlaying ? 'Pause' : 'Play'}
              icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
              onClick={togglePlayPause}
              size="lg"
              colorScheme="blue"
              borderRadius="full"
            />
            
            <VStack flex={1} spacing={1} align="stretch">
              <Slider
                value={currentTime}
                max={duration || 100}
                onChange={seekTo}
                focusThumbOnChange={false}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              
              <HStack justify="space-between">
                <Text fontSize="sm">{formatTime(currentTime)}</Text>
                <Text fontSize="sm">{formatTime(duration)}</Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </Box>

      {/* Show Notes and Chapters */}
      <Box>
        {/* タブ */}
        <HStack spacing={0} borderBottom="1px solid" borderColor="gray.300">
          <Box
            as="button"
            px={4}
            py={2}
            border="1px solid"
            borderColor="gray.300"
            borderBottom="none"
            borderTopLeftRadius="md"
            borderTopRightRadius="md"
            bg={selectedTab === 'showNotes' ? 'white' : 'gray.50'}
            color={selectedTab === 'showNotes' ? 'black' : 'gray.500'}
            fontWeight={selectedTab === 'showNotes' ? 'semibold' : 'normal'}
            onClick={() => setSelectedTab('showNotes')}
            transition="all 0.2s"
            position="relative"
            bottom="-1px"
          >
            <Text>Show Notes</Text>
          </Box>
          <Box
            as="button"
            px={4}
            py={2}
            border="1px solid"
            borderColor="gray.300"
            borderBottom="none"
            borderTopLeftRadius="md"
            borderTopRightRadius="md"
            bg={selectedTab === 'chapters' ? 'white' : 'gray.50'}
            color={selectedTab === 'chapters' ? 'black' : 'gray.500'}
            fontWeight={selectedTab === 'chapters' ? 'semibold' : 'normal'}
            onClick={() => setSelectedTab('chapters')}
            transition="all 0.2s"
            position="relative"
            bottom="-1px"
            ml="1"
          >
            <Text>Chapters</Text>
          </Box>
          <Box flex={1} />
        </HStack>

        {/* コンテンツエリア */}
        <Box 
          border="1px solid"
          borderColor="gray.300"
          borderTop="none"
          borderBottomRadius="md"
          bg="white"
          p={4}
        >
          {selectedTab === 'showNotes' ? (
            <VStack align="stretch" spacing={2}>
              {showNotes.map((note, index) => (
                <Box key={index}>
                  {note.url ? (
                    <Link href={note.url} isExternal>
                      <HStack justify="space-between" _hover={{ color: 'blue.500' }}>
                        <Text>• {note.title}</Text>
                        <ExternalLinkIcon w={4} h={4} color="gray.500" />
                      </HStack>
                    </Link>
                  ) : (
                    <Text>• {note.title}</Text>
                  )}
                </Box>
              ))}
            </VStack>
          ) : (
            <VStack align="stretch" spacing={0}>
              {chapters.map((chapter, index) => (
                <Box
                  key={index}
                  as="button"
                  py={2}
                  px={2}
                  mx={-2}
                  w="calc(100% + 16px)"
                  textAlign="left"
                  onClick={() => handleChapterClick(chapter.startTime)}
                  transition="background-color 0.2s"
                  borderRadius="sm"
                  _hover={{
                    bg: 'gray.50',
                  }}
                  _active={{
                    bg: 'gray.100',
                  }}
                >
                  <HStack>
                    <Text fontSize="sm" color="gray.600" fontFamily="monospace">
                      ({chapter.timestamp})
                    </Text>
                    <Text fontSize="sm">
                      • {chapter.title}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </Box>
    </VStack>
  )
}

export default PodcastPlayer
