library(googledrive)

# Authenticate using the service account credentials stored as a GitHub Secret
drive_auth(path = Sys.getenv("GOOGLE_APPLICATION_CREDENTIALS"))

# Find the MooreJackson folder
folder <- drive_ls(path = "MooreJackson")

# Filter for MJTrees CSV
target_file <- folder[grepl("MJTrees", folder$name), ]

# Download it to the root of the repo
drive_download(
  file = as_id(target_file$id),
  path = "MJTrees.csv",
  overwrite = TRUE
)

cat("MJTrees.csv downloaded successfully!\n")
