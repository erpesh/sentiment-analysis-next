import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

function useRatingStyles() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        '& .MuiRating-iconFilled': {
          color: '#24b47e',
        },
      },
    })
  );

  const classes = useStyles();
  return classes;
}

export default useRatingStyles;