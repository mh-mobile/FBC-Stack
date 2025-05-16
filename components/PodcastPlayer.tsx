import React, { useRef, useState, useEffect } from 'react'
import {
  Box,
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Chapter, ShowNote } from '../types/podcastData'

// Chakra UIにPlayIcon/PauseIconがない場合のカスタム実装
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
  </svg>
)

// より明確な10秒巻き戻しアイコン  
const Backward10Icon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
    <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="16" y="16" fontSize="12" fill="currentColor" textAnchor="middle" fontWeight="bold" dominantBaseline="middle">10</text>
    <path d="M13 10v6h6" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M19 16c0 1.65-1.35 3-3 3s-3-1.35-3-3 1.35-3 3-3" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

// より明確な10秒早送りアイコン
const Forward10Icon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
    <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="16" y="16" fontSize="12" fill="currentColor" textAnchor="middle" fontWeight="bold" dominantBaseline="middle">10</text>
    <path d="M19 10v6h-6" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M13 16c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

const VolumeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
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
  const [playbackRate, setPlaybackRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const updatePlayStatus = () => setIsPlaying(!audio.paused)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('play', updatePlayStatus)
    audio.addEventListener('pause', updatePlayStatus)
    audio.addEventListener('ended', updatePlayStatus)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('play', updatePlayStatus)
      audio.removeEventListener('pause', updatePlayStatus)
      audio.removeEventListener('ended', updatePlayStatus)
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

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Math.min(audio.currentTime + 10, audio.duration)
    seekTo(newTime)
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = Math.max(audio.currentTime - 10, 0)
    seekTo(newTime)
  }

  const changePlaybackRate = (rate: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.playbackRate = rate
    setPlaybackRate(rate)
  }

  const changeVolume = (value: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = value
    setVolume(value)
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
    <VStack spacing={4} align="stretch" w="100%">
      <audio ref={audioRef} src={audioUrl} />
      
      {/* Player Controls */}
      <Box
        bg="#F7FAFC"
        borderRadius="lg"
        p={4}
        boxShadow="sm"
      >
        <HStack spacing={4} align="center">
          {/* 10秒巻き戻し */}
          <IconButton
            aria-label="10秒巻き戻し"
            icon={<Backward10Icon />}
            onClick={skipBackward}
            size="md"
            variant="ghost"
            color="#3182CE"
            _hover={{ bg: 'gray.100' }}
            p={0}
          />
          
          {/* 再生・一時停止ボタン */}
          <IconButton
            aria-label={isPlaying ? '一時停止' : '再生'}
            icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
            onClick={togglePlayPause}
            size="lg"
            bg="#3182CE"
            color="white"
            borderRadius="full"
            _hover={{ bg: '#2C5282' }}
            minW="48px"
            h="48px"
          />
          
          {/* 10秒早送り */}
          <IconButton
            aria-label="10秒早送り"
            icon={<Forward10Icon />}
            onClick={skipForward}
            size="md"
            variant="ghost"
            color="#3182CE"
            _hover={{ bg: 'gray.100' }}
            p={0}
          />
          
          {/* 進捗バーとタイム表示 */}
          <HStack spacing={2} flex={1}>
            <Text fontSize="sm" color="gray.600" minW="45px">
              {formatTime(currentTime)}
            </Text>
            
            <Slider
              value={currentTime}
              max={duration || 100}
              onChange={seekTo}
              focusThumbOnChange={false}
              flex={1}
            >
              <SliderTrack bg="gray.200" h="4px">
                <SliderFilledTrack bg="#3182CE" />
              </SliderTrack>
              <SliderThumb boxSize={3} bg="#3182CE" />
            </Slider>
            
            <Text fontSize="sm" color="gray.600" minW="45px">
              {formatTime(duration)}
            </Text>
          </HStack>
          
          {/* 音量 */}
          <Box position="relative">
            <IconButton
              aria-label="音量"
              icon={<VolumeIcon />}
              size="sm"
              variant="ghost"
              color="#3182CE"
              _hover={{ bg: 'gray.100' }}
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            />
            {showVolumeSlider && (
              <Box
                position="absolute"
                bottom="40px"
                left="50%"
                transform="translateX(-50%)"
                bg="white"
                p={2}
                borderRadius="md"
                boxShadow="md"
                minWidth="120px"
              >
                <Slider
                  value={volume}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={changeVolume}
                  orientation="horizontal"
                >
                  <SliderTrack bg="gray.200">
                    <SliderFilledTrack bg="#3182CE" />
                  </SliderTrack>
                  <SliderThumb bg="#3182CE" />
                </Slider>
              </Box>
            )}
          </Box>
          
          {/* メニュー（再生速度） */}
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="その他のオプション"
              icon={<MenuIcon />}
              size="sm"
              variant="ghost"
              _hover={{ bg: 'gray.200' }}
            />
            <MenuList>
              <MenuItem onClick={() => changePlaybackRate(0.75)}>
                再生速度 0.75x{playbackRate === 0.75 && ' ✓'}
              </MenuItem>
              <MenuItem onClick={() => changePlaybackRate(1)}>
                再生速度 1x{playbackRate === 1 && ' ✓'}
              </MenuItem>
              <MenuItem onClick={() => changePlaybackRate(1.25)}>
                再生速度 1.25x{playbackRate === 1.25 && ' ✓'}
              </MenuItem>
              <MenuItem onClick={() => changePlaybackRate(1.5)}>
                再生速度 1.5x{playbackRate === 1.5 && ' ✓'}
              </MenuItem>
              <MenuItem onClick={() => changePlaybackRate(1.75)}>
                再生速度 1.75x{playbackRate === 1.75 && ' ✓'}
              </MenuItem>
              <MenuItem onClick={() => changePlaybackRate(2)}>
                再生速度 2x{playbackRate === 2 && ' ✓'}
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>

      {/* Show Notes and Chapters */}
      <Box>
        {/* タブ */}
        <Box>
          <HStack spacing={0} borderBottom="1px solid" borderColor="gray.300">
            <Box
              as="button"
              px={4}
              py={2}
              color={selectedTab === 'showNotes' ? 'black' : 'gray.500'}
              fontWeight={selectedTab === 'showNotes' ? 'semibold' : 'normal'}
              onClick={() => setSelectedTab('showNotes')}
              transition="all 0.2s"
              position="relative"
              borderBottom={selectedTab === 'showNotes' ? '2px solid' : 'none'}
              borderBottomColor="#3182CE"
              marginBottom={selectedTab === 'showNotes' ? '-1px' : '0'}
            >
              <Text>Show Notes</Text>
            </Box>
            <Box
              as="button"
              px={4}
              py={2}
              color={selectedTab === 'chapters' ? 'black' : 'gray.500'}
              fontWeight={selectedTab === 'chapters' ? 'semibold' : 'normal'}
              onClick={() => setSelectedTab('chapters')}
              transition="all 0.2s"
              position="relative"
              borderBottom={selectedTab === 'chapters' ? '2px solid' : 'none'}
              borderBottomColor="#3182CE"
              marginBottom={selectedTab === 'chapters' ? '-1px' : '0'}
            >
              <Text>Chapters</Text>
            </Box>
          </HStack>
        </Box>

        {/* コンテンツエリア */}
        <Box 
          bg="white"
          p={4}
        >
          {selectedTab === 'showNotes' ? (
            <VStack align="stretch" spacing={2}>
              {showNotes.map((note, index) => (
                <Box key={index}>
                  {note.url ? (
                    <Link href={note.url} isExternal>
                      <HStack justify="space-between" _hover={{ color: '#3182CE' }}>
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
                  px={3}
                  w="100%"
                  textAlign="left"
                  onClick={() => handleChapterClick(chapter.startTime)}
                  transition="background-color 0.2s"
                  borderRadius="sm"
                  _hover={{
                    bg: '#F7FAFC',
                  }}
                  _active={{
                    bg: 'gray.100',
                  }}
                >
                  <HStack spacing={3} align="flex-start">
                    <Text fontSize="sm" color="gray.600" fontFamily="monospace" flexShrink={0}>
                      {chapter.timestamp}
                    </Text>
                    <Text fontSize="sm" flexGrow={1}>
                      {chapter.title}
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
