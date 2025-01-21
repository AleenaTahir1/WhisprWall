# Additional clean files
cmake_minimum_required(VERSION 3.16)

if("${CONFIG}" STREQUAL "" OR "${CONFIG}" STREQUAL "Debug")
  file(REMOVE_RECURSE
  "CMakeFiles\\WhisprWall_autogen.dir\\AutogenUsed.txt"
  "CMakeFiles\\WhisprWall_autogen.dir\\ParseCache.txt"
  "WhisprWall_autogen"
  )
endif()
