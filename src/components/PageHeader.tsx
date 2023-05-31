import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

interface PageHeaderProps {
    title?: string;
    subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
        <Stack sx={{ marginBottom: 3 }}>
            <Typography
                sx={{ fontWeight: "bold" }}
                component="span"
                variant="h4"
                color="yellow"
            >
                {title ? title : <Skeleton />}
            </Typography>
            <Typography
                component="span"
                variant="h6"
                color="text.primary"
            >
                {subtitle ? subtitle : <Skeleton />}
            </Typography>
        </Stack>
    );
}

export default PageHeader;