if ! [ -x "$(command -v contentful)" ]
then
  echo "No available 'contentful' command is found"
  exit 1
fi

echo "Enter space ID: "
read SPACE_ID

echo "Enter environment ID: "
read ENV_ID

echo "Enter migration file name: "
read MIGRATION_NAME

contentful space migration --space-id $SPACE_ID --environment-id $ENV_ID $MIGRATION_NAME --yes
