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
import {
  MdReplay10,
  MdForward10,
  MdPlayArrow,
  MdPause,
  MdVolumeUp,
  MdMoreVert,
} from 'react-icons/md'
import { Chapter, ShowNote } from '../types/podcastData'

// Material Design Iconsを使用
const VolumeIcon = () => <MdVolumeUp />
const MenuIcon = () => <MdMoreVert />

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
  const [selectedTab, setSelectedTab] = useState<'showNotes' | 'chapters'>(
    'showNotes',
  )
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

  useEffect(() => {
    if (showVolumeSlider) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node
        const volumeButton = document.querySelector('[aria-label="音量"]')
        const volumeSlider = document.querySelector(
          '[data-volume-slider="true"]',
        )

        if (
          volumeButton &&
          !volumeButton.contains(target) &&
          volumeSlider &&
          !volumeSlider.contains(target)
        ) {
          setShowVolumeSlider(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showVolumeSlider])

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
      <Box bg="#F7FAFC" borderRadius="lg" p={{ base: 3, md: 4 }} boxShadow="sm">
        {/* スマホ用レイアウト（垂直配置） - md未満で表示 */}
        <Box display={{ base: 'block', md: 'none' }}>
          <VStack spacing={3} align="stretch">
            {/* 上部コントロール - 再生/一時停止、巻き戻し、早送り */}
            <HStack spacing={2} align="center" justify="center">
              {/* 10秒巻き戻し */}
              <IconButton
                aria-label="10秒巻き戻し"
                icon={<MdReplay10 size="24px" />}
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
                icon={
                  isPlaying ? (
                    <MdPause size="24px" />
                  ) : (
                    <MdPlayArrow size="24px" />
                  )
                }
                onClick={togglePlayPause}
                size="lg"
                bg="#3182CE"
                color="white"
                borderRadius="full"
                _hover={{ bg: '#2C5282' }}
                minW="44px"
                h="44px"
              />

              {/* 10秒早送り */}
              <IconButton
                aria-label="10秒早送り"
                icon={<MdForward10 size="24px" />}
                onClick={skipForward}
                size="md"
                variant="ghost"
                color="#3182CE"
                _hover={{ bg: 'gray.100' }}
                p={0}
              />
            </HStack>

            {/* 進捗バーとタイム表示 */}
            <HStack spacing={2}>
              <Text
                fontSize="sm"
                color="gray.600"
                minW="35px"
                textAlign="center"
              >
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

              <Text
                fontSize="sm"
                color="gray.600"
                minW="35px"
                textAlign="center"
              >
                {formatTime(duration)}
              </Text>
            </HStack>

            {/* 音量と設定コントロール */}
            <HStack spacing={2} justify="flex-end">
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
                    data-volume-slider="true"
                    zIndex={10}
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
          </VStack>
        </Box>

        {/* PC用レイアウト（水平配置） - md以上で表示 */}
        <Box display={{ base: 'none', md: 'block' }}>
          <HStack spacing={4} align="center">
            {/* 10秒巻き戻し */}
            <IconButton
              aria-label="10秒巻き戻し"
              icon={<MdReplay10 size="24px" />}
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
              icon={
                isPlaying ? (
                  <MdPause size="24px" />
                ) : (
                  <MdPlayArrow size="24px" />
                )
              }
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
              icon={<MdForward10 size="24px" />}
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
                  data-volume-slider="true"
                  zIndex={10}
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
      </Box>

      {/* Show Notes and Chapters */}
      <Box>
        {/* タブ */}
        <Box>
          {/* スマホ用タブ - md未満で表示 */}
          <HStack
            spacing={0}
            borderBottom="1px solid"
            borderColor="gray.300"
            display={{ base: 'flex', md: 'none' }}
          >
            <Box
              as="button"
              px={3}
              py={1}
              fontSize="sm"
              color={selectedTab === 'showNotes' ? 'black' : 'gray.500'}
              fontWeight={selectedTab === 'showNotes' ? 'semibold' : 'normal'}
              onClick={() => setSelectedTab('showNotes')}
              transition="all 0.2s"
              position="relative"
              borderBottom={selectedTab === 'showNotes' ? '2px solid' : 'none'}
              borderBottomColor="#3182CE"
              marginBottom={selectedTab === 'showNotes' ? '-1px' : '0'}
              flex={1}
              textAlign="center"
            >
              <Text>Show Notes</Text>
            </Box>
            <Box
              as="button"
              px={3}
              py={1}
              fontSize="sm"
              color={selectedTab === 'chapters' ? 'black' : 'gray.500'}
              fontWeight={selectedTab === 'chapters' ? 'semibold' : 'normal'}
              onClick={() => setSelectedTab('chapters')}
              transition="all 0.2s"
              position="relative"
              borderBottom={selectedTab === 'chapters' ? '2px solid' : 'none'}
              borderBottomColor="#3182CE"
              marginBottom={selectedTab === 'chapters' ? '-1px' : '0'}
              flex={1}
              textAlign="center"
            >
              <Text>Chapters</Text>
            </Box>
          </HStack>

          {/* PC用タブ - md以上で表示 */}
          <HStack
            spacing={0}
            borderBottom="1px solid"
            borderColor="gray.300"
            display={{ base: 'none', md: 'flex' }}
          >
            <Box
              as="button"
              px={4}
              py={2}
              fontSize="md"
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
              fontSize="md"
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
        <Box bg="white" p={{ base: 3, md: 4 }}>
          {selectedTab === 'showNotes' ? (
            <VStack align="stretch" spacing={2}>
              {showNotes.map((note, index) => (
                <Box key={index} fontSize={{ base: 'sm', md: 'md' }}>
                  {note.url ? (
                    <Link href={note.url} isExternal>
                      <HStack
                        justify="space-between"
                        _hover={{ color: '#3182CE' }}
                        alignItems="flex-start"
                      >
                        <Text>• {note.title}</Text>
                        <ExternalLinkIcon
                          w={4}
                          h={4}
                          color="gray.500"
                          flexShrink={0}
                          mt={1}
                        />
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
                  py={{ base: 1.5, md: 2 }}
                  px={{ base: 2, md: 3 }}
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
                  <HStack spacing={{ base: 2, md: 3 }} align="flex-start">
                    <Text
                      fontSize={{ base: 'xs', md: 'sm' }}
                      color="gray.600"
                      fontFamily="monospace"
                      flexShrink={0}
                    >
                      {chapter.timestamp}
                    </Text>
                    <Text fontSize={{ base: 'sm', md: 'sm' }} flexGrow={1}>
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
